defmodule SneakyChat.MessageView do
  def message_json(message) do
    %{
      id: message.id,
      body: message.body,
      user: message.user_id,
      inserted_at: message.inserted_at,
    }
  end
end
