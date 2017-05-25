defmodule TheNetwork.Web.ArticleController do
  use TheNetwork.Web, :controller

  alias TheNetwork.Channels
  alias TheNetwork.Channels.Article

  action_fallback TheNetwork.Web.FallbackController

  def index(conn, _params) do
    articles = Channels.list_articles()
    render(conn, "index.json", articles: articles)
  end

  def create(conn, %{"article" => article_params}) do
    with {:ok, %Article{} = article} <- Channels.create_article(article_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", channel_article_path(conn, :show, article))
      |> render("show.json", article: article)
    end
  end

  def show(conn, %{"id" => id}) do
    article = Channels.get_article!(id)
    render(conn, "show.json", article: article)
  end

  def update(conn, %{"id" => id, "article" => article_params}) do
    article = Channels.get_article!(id)

    with {:ok, %Article{} = article} <- Channels.update_article(article, article_params) do
      render(conn, "show.json", article: article)
    end
  end

  def delete(conn, %{"id" => id}) do
    article = Channels.get_article!(id)
    with {:ok, %Article{}} <- Channels.delete_article(article) do
      send_resp(conn, :no_content, "")
    end
  end
end
