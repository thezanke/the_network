defmodule TheNetwork.Web.Router do
  use TheNetwork.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :put_user_token
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", TheNetwork.Web do
    pipe_through :api

    # This seems... gross
    resources "/channels", ChannelController, except: [:new, :edit] do
      resources "/articles", ArticleController, except: [:new, :edit] do
        resources "/comments", CommentController, except: [:new, :edit]
      end
    end
    resources "/users", UserController, except: [:new, :edit]
  end

  scope "/", TheNetwork.Web do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end

  defp put_user_token(conn, _) do
    if current_user = conn.assigns[:current_user] do
      token = Phoenix.Token.sign(conn, "user socket", current_user.id)
      assign(conn, :user_token, token)
    else
      conn
    end
  end
end
