defmodule SneakyChat.RoomChannel do
  use Phoenix.Channel
  import Guardian.Phoenix.Socket
  alias SneakyChat.Presence

  def join("room:" <> _room_name, %{"auth_token" => token}, socket) do
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

  def handle_in("new_msg", %{"body" => body}, socket) do
    broadcast! socket, "new_msg", %{
      body: body,
      user_id: current_user(socket).id,
      sent_at: DateTime.utc_now |> Timex.format("%H:%M", :strftime) |> elem(1)
    }

    {:noreply, socket}
  end

  defp current_user(socket) do
    current_resource(socket)
  end

end
