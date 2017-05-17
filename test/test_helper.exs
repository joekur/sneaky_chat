ExUnit.start

Ecto.Adapters.SQL.Sandbox.mode(SneakyChat.Repo, :manual)

{:ok, _} = Application.ensure_all_started(:ex_machina)
