defmodule SneakyChat.Presence do
  use Phoenix.Presence, otp_app: :sneaky_chat, pubsub_server: SneakyChat.PubSub
end
