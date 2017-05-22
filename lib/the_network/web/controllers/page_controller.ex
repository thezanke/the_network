defmodule TheNetwork.Web.PageController do
  use TheNetwork.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
