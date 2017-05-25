defmodule TheNetwork.Web.ArticleController do
  use TheNetwork.Web, :controller

  alias TheNetwork.Channels
  alias TheNetwork.Channels.Article

  action_fallback TheNetwork.Web.FallbackController

  def action(conn, _) do
    channel = Channels.get_channel!(conn.params["channel_id"])
    args = [conn, conn.params, channel]
    apply(__MODULE__, action_name(conn), args)
  end

  def index(conn, _params, channel) do
    articles = Channels.list_articles(channel)
    render(conn, "index.json", articles: articles)
  end

  def create(conn, %{"article" => article_params}, channel) do
    article_params = Map.put(article_params, "channel_id", channel.id)

    with {:ok, %Article{} = article} <- Channels.create_article(article_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", channel_article_path(conn, :show, article))
      |> render("show.json", article: article)
    end
  end

  def show(conn, %{"id" => id}, channel) do
    article = Channels.get_article!(channel, id)
    render(conn, "show.json", article: article)
  end

  def update(conn, %{"id" => id, "article" => article_params}, channel) do
    article = Channels.get_article!(channel, id)

    case Channels.update_article(article, article_params) do
      {:ok, %Article{} = article} ->
        render(conn, "show.json", article: article)
    end
  end

  def delete(conn, %{"id" => id}, channel) do
    article = Channels.get_article!(channel, id)

    with {:ok, %Article{}} <- Channels.delete_article(article) do
      send_resp(conn, :no_content, "")
    end
  end
end
