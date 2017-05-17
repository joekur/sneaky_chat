defmodule SneakyChat.ViewHelpers do
  def webpack_path(conn, path) do
    if Mix.env == :dev do
      "http://localhost:8080/priv/static/js/#{path}"
    else
      Phoenix.Router.Helpers.static_path(conn, "js/#{path}")
    end
  end
end
