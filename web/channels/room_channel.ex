defmodule SneakyChat.RoomChannel do
  use Phoenix.Channel
  alias SneakyChat.Presence

  def join("room:" <> _room_name, _message, socket) do
    send(self(), :after_join)
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    push socket, "presence_state", Presence.list(socket)
    push socket, "load_room", %{
      messages: SneakyChat.Message |> SneakyChat.Repo.all |> Enum.map(fn(x) -> Map.from_struct(x) |> Map.drop([:__meta__]) end)
    }
    {:ok, _} = Presence.track(socket, socket.assigns.uuid, %{})

    {:noreply, socket}
  end

  def handle_in("new_msg", %{"body" => body}, socket) do
    broadcast! socket, "new_msg", %{
      body: body,
      author_uuid: socket.assigns.uuid,
      sent_at: DateTime.utc_now |> Timex.format("%H:%M", :strftime) |> elem(1)
    }

    {:noreply, socket}
  end

end
