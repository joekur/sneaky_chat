defmodule SneakyChat.ViewHelpers do
  import SneakyChat.Router.Helpers

  def webpack_path(conn, path) do
    if Mix.env == :dev do
      "http://localhost:8080/priv/static/js/#{path}"
    else
      static_path(conn, "/js/#{path}")
    end
  end
end
