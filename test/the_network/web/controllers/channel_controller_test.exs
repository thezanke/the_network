defmodule TheNetwork.Web.ChannelControllerTest do
  use TheNetwork.Web.ConnCase

  alias TheNetwork.Channels
  alias TheNetwork.Channels.Channel

  @create_attrs %{description: "some description", name: "some name"}
  @update_attrs %{description: "some updated description", name: "some updated name"}
  @invalid_attrs %{description: nil, name: nil}

  def fixture(:channel) do
    {:ok, channel} = Channels.create_channel(@create_attrs)
    channel
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, channel_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "creates channel and renders channel when data is valid", %{conn: conn} do
    conn = post conn, channel_path(conn, :create), channel: @create_attrs
    assert %{"id" => id} = json_response(conn, 201)["data"]

    conn = get conn, channel_path(conn, :show, id)
    assert json_response(conn, 200)["data"] == %{
      "id" => id,
      "description" => "some description",
      "name" => "some name"}
  end

  test "does not create channel and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, channel_path(conn, :create), channel: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates chosen channel and renders channel when data is valid", %{conn: conn} do
    %Channel{id: id} = channel = fixture(:channel)
    conn = put conn, channel_path(conn, :update, channel), channel: @update_attrs
    assert %{"id" => ^id} = json_response(conn, 200)["data"]

    conn = get conn, channel_path(conn, :show, id)
    assert json_response(conn, 200)["data"] == %{
      "id" => id,
      "description" => "some updated description",
      "name" => "some updated name"}
  end

  test "does not update chosen channel and renders errors when data is invalid", %{conn: conn} do
    channel = fixture(:channel)
    conn = put conn, channel_path(conn, :update, channel), channel: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen channel", %{conn: conn} do
    channel = fixture(:channel)
    conn = delete conn, channel_path(conn, :delete, channel)
    assert response(conn, 204)
    assert_error_sent 404, fn ->
      get conn, channel_path(conn, :show, channel)
    end
  end
end
