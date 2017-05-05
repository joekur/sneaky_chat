defmodule SneakyChat.RoomChannel do
  use Phoenix.Channel
  alias SneakyChat.Presence

  def room("room:" <> _room_name, _message, socket) do
    send(self, :after_join)
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    push socket, "presence_state", Presence.list(socket)
    {:ok, _} = Presence.track(socket, socket.assigns.uuid)
  end
end
