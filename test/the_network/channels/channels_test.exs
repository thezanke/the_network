defmodule TheNetwork.ChannelsTest do
  use TheNetwork.DataCase

  alias TheNetwork.Channels

  describe "articles" do
    alias TheNetwork.Channels.Article

    @valid_attrs %{headline: "some headline", url: "some url"}
    @update_attrs %{headline: "some updated headline", url: "some updated url"}
    @invalid_attrs %{headline: nil, url: nil}

    def article_fixture(attrs \\ %{}) do
      {:ok, article} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Channels.create_article()

      article
    end

    test "list_articles/0 returns all articles" do
      article = article_fixture()
      assert Channels.list_articles() == [article]
    end

    test "get_article!/1 returns the article with given id" do
      article = article_fixture()
      assert Channels.get_article!(article.id) == article
    end

    test "create_article/1 with valid data creates a article" do
      assert {:ok, %Article{} = article} = Channels.create_article(@valid_attrs)
      assert article.headline == "some headline"
      assert article.url == "some url"
    end

    test "create_article/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Channels.create_article(@invalid_attrs)
    end

    test "update_article/2 with valid data updates the article" do
      article = article_fixture()
      assert {:ok, article} = Channels.update_article(article, @update_attrs)
      assert %Article{} = article
      assert article.headline == "some updated headline"
      assert article.url == "some updated url"
    end

    test "update_article/2 with invalid data returns error changeset" do
      article = article_fixture()
      assert {:error, %Ecto.Changeset{}} = Channels.update_article(article, @invalid_attrs)
      assert article == Channels.get_article!(article.id)
    end

    test "delete_article/1 deletes the article" do
      article = article_fixture()
      assert {:ok, %Article{}} = Channels.delete_article(article)
      assert_raise Ecto.NoResultsError, fn -> Channels.get_article!(article.id) end
    end

    test "change_article/1 returns a article changeset" do
      article = article_fixture()
      assert %Ecto.Changeset{} = Channels.change_article(article)
    end
  end

  describe "channels" do
    alias TheNetwork.Channels.Channel

    @valid_attrs %{description: "some description", name: "some name"}
    @update_attrs %{description: "some updated description", name: "some updated name"}
    @invalid_attrs %{description: nil, name: nil}

    def channel_fixture(attrs \\ %{}) do
      {:ok, channel} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Channels.create_channel()

      channel
    end

    test "list_channels/0 returns all channels" do
      channel = channel_fixture()
      assert Channels.list_channels() == [channel]
    end

    test "get_channel!/1 returns the channel with given id" do
      channel = channel_fixture()
      assert Channels.get_channel!(channel.id) == channel
    end

    test "create_channel/1 with valid data creates a channel" do
      assert {:ok, %Channel{} = channel} = Channels.create_channel(@valid_attrs)
      assert channel.description == "some description"
      assert channel.name == "some name"
    end

    test "create_channel/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Channels.create_channel(@invalid_attrs)
    end

    test "update_channel/2 with valid data updates the channel" do
      channel = channel_fixture()
      assert {:ok, channel} = Channels.update_channel(channel, @update_attrs)
      assert %Channel{} = channel
      assert channel.description == "some updated description"
      assert channel.name == "some updated name"
    end

    test "update_channel/2 with invalid data returns error changeset" do
      channel = channel_fixture()
      assert {:error, %Ecto.Changeset{}} = Channels.update_channel(channel, @invalid_attrs)
      assert channel == Channels.get_channel!(channel.id)
    end

    test "delete_channel/1 deletes the channel" do
      channel = channel_fixture()
      assert {:ok, %Channel{}} = Channels.delete_channel(channel)
      assert_raise Ecto.NoResultsError, fn -> Channels.get_channel!(channel.id) end
    end

    test "change_channel/1 returns a channel changeset" do
      channel = channel_fixture()
      assert %Ecto.Changeset{} = Channels.change_channel(channel)
    end
  end
end
