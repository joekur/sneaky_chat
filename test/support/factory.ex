defmodule SneakyChat.Factory do
  use ExMachina.Ecto, repo: SneakyChat.Repo

  def message_factory do
    %SneakyChat.Message {
      body: "hello world",
      room_id: 1,
      user_id: 1
    }
  end
end
