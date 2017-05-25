defmodule TheNetwork.Web.ArticleControllerTest do
  use TheNetwork.Web.ConnCase

  alias TheNetwork.Channels
  alias TheNetwork.Channels.Article

  @create_attrs %{headline: "some headline", url: "some url"}
  @update_attrs %{headline: "some updated headline", url: "some updated url"}
  @invalid_attrs %{headline: nil, url: nil}

  def fixture(:article) do
    {:ok, article} = Channels.create_article(@create_attrs)
    article
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, channel_article_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "creates article and renders article when data is valid", %{conn: conn} do
    conn = post conn, channel_article_path(conn, :create), article: @create_attrs
    assert %{"id" => id} = json_response(conn, 201)["data"]

    conn = get conn, channel_article_path(conn, :show, id)
    assert json_response(conn, 200)["data"] == %{
      "id" => id,
      "headline" => "some headline",
      "url" => "some url"}
  end

  test "does not create article and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, channel_article_path(conn, :create), article: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates chosen article and renders article when data is valid", %{conn: conn} do
    %Article{id: id} = article = fixture(:article)
    conn = put conn, channel_article_path(conn, :update, article), article: @update_attrs
    assert %{"id" => ^id} = json_response(conn, 200)["data"]

    conn = get conn, channel_article_path(conn, :show, id)
    assert json_response(conn, 200)["data"] == %{
      "id" => id,
      "headline" => "some updated headline",
      "url" => "some updated url"}
  end

  test "does not update chosen article and renders errors when data is invalid", %{conn: conn} do
    article = fixture(:article)
    conn = put conn, channel_article_path(conn, :update, article), article: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen article", %{conn: conn} do
    article = fixture(:article)
    conn = delete conn, channel_article_path(conn, :delete, article)
    assert response(conn, 204)
    assert_error_sent 404, fn ->
      get conn, channel_article_path(conn, :show, article)
    end
  end
end
