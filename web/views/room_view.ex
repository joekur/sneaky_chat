defmodule SneakyChat.RoomView do
  use SneakyChat.Web, :view

  def render("history.json", %{messages: messages}) do
    %{
      messages: Enum.map(messages, &message_json/1)
    }
  end

  def message_json(message) do
    %{
      body: message.body,
      user_id: message.user_id,
      inserted_at: message.inserted_at
    }
  end
end
