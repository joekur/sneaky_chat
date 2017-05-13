defmodule SneakyChat.RoomChannel do
  use Phoenix.Channel
  import Guardian.Phoenix.Socket
  alias SneakyChat.Presence

  def join("room:" <> _room_id, %{"auth_token" => token}, socket) do
    case sign_in(socket, token) do
      {:ok, authed_socket, _guardian_params} ->
        send(self(), :after_join)
        {:ok, authed_socket}
      {:error, _reason} ->
        :error
    end
  end
  def join(room, _, socket) do
    {:error,  :authentication_required}
  end

  def handle_info(:after_join, socket) do
    push socket, "presence_state", Presence.list(socket)
    push socket, "load_room", %{
      messages: SneakyChat.Message |> SneakyChat.Repo.all |> Enum.map(fn(x) -> Map.from_struct(x) |> Map.drop([:__meta__]) end)
    }
    {:ok, _} = Presence.track(socket, current_user(socket).id, %{})

    {:noreply, socket}
  end

  def handle_in("new:message", params, socket) do
    %{"body" => body, "client_timestamp" => client_timestamp} = params
    attrs = %{
      body: body,
      user_id: current_user(socket).id,
      room_id: current_room_id(socket),
    }

    {:ok, msg} = %SneakyChat.Message{}
                 |> SneakyChat.Message.changeset(attrs)
                 |> SneakyChat.Repo.insert

    broadcast! socket, "new:message", SneakyChat.MessageView.message_json(msg)

    resp = %{client_timestamp: client_timestamp}
    {:reply, {:ok, resp}, socket}
  end

  defp current_user(socket) do
    current_resource(socket)
  end

  defp current_room_id(socket) do
    "room:" <> room_id = socket.topic
    room_id
  end

end
