defmodule SneakyChat.RegistrationController do
  use SneakyChat.Web, :controller

  alias SneakyChat.User

  def new(conn, _params) do
    changeset = User.registration_changeset(%User{})
    render conn, "new.html", changeset: changeset
  end

  def create(conn, %{"user" => user_params}) do
    changeset = User.registration_changeset(%User{}, user_params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        conn
        |> SneakyChat.Auth.login(user)
        |> redirect(to: page_path(conn, :index))
      {:error, changeset} ->
        conn
        |> render("new.html", changeset: changeset)
    end
  end
end
