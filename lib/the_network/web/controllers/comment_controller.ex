defmodule TheNetwork.Web.CommentController do
  use TheNetwork.Web, :controller

  alias TheNetwork.Channels
  alias TheNetwork.Channels.Comment

  action_fallback TheNetwork.Web.FallbackController

  def action(conn, _) do
    channel = Channels.get_channel!(conn.params["channel_id"])
    article = Channels.get_article!(channel, conn.params["article_id"])
    args = [conn, conn.params, article, channel]
    apply(__MODULE__, action_name(conn), args)
  end

  def index(conn, _params, article, _channel) do
    comments = Channels.list_comments(article)
    render(conn, "index.json", comments: comments)
  end

  def create(conn, %{"comment" => comment_params}, article, channel) do
    comment_params = comment_params |> Map.put("article_id", article.id)

    with {:ok, %Comment{} = comment} <- Channels.create_comment(comment_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", channel_article_comment_path(conn, :show, channel, article, comment))
      |> render("show.json", comment: comment)
    end
  end

  def show(conn, %{"id" => id}, article, _channel) do
    comment = Channels.get_comment!(article, id)
    render(conn, "show.json", comment: comment)
  end

  def update(conn, %{"id" => id, "comment" => comment_params}, article, _channel) do
    comment = Channels.get_comment!(article, id)

    with {:ok, %Comment{} = comment} <- Channels.update_comment(comment, comment_params) do
      render(conn, "show.json", comment: comment)
    end
  end

  def delete(conn, %{"id" => id}, article, _channel) do
    comment = Channels.get_comment!(article, id)

    with {:ok, %Comment{}} <- Channels.delete_comment(comment) do
      send_resp(conn, :no_content, "")
    end
  end
end
