# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :sneaky_chat,
  ecto_repos: [SneakyChat.Repo]

# Configures the endpoint
config :sneaky_chat, SneakyChat.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "2EJhtyp2zFFw+MjuLxdZPKr39pctCM9Whsx3T+Q6iwWjR5zJ3wPUxQqgBgDhkduR",
  render_errors: [view: SneakyChat.ErrorView, accepts: ~w(html json)],
  pubsub: [name: SneakyChat.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :guardian, Guardian,
  allowed_algos: ["HS512"],
  verify_module: Guardian.JWT,
  issuer: "SneakyChat",
  ttl: { 30, :days},
  verify_issuer: true,
  secret_key: System.get_env("GUARDIAN_SECRET"),
  serializer: SneakyChat.GuardianSerializer

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
