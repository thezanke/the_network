defmodule TheNetwork.Web.ArticlesChannel do
  @moduledoc false
  use TheNetwork.Web, :channel

  def join("articles:lobby", payload, socket) do
    {:ok, socket}
  end
end
