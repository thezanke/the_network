defmodule TheNetwork.Web.ChannelView do
  use TheNetwork.Web, :view
  alias TheNetwork.Web.ChannelView

  def render("index.json", %{channels: channels}) do
    %{data: render_many(channels, ChannelView, "channel.json")}
  end

  def render("show.json", %{channel: channel}) do
    %{data: render_one(channel, ChannelView, "channel.json")}
  end

  def render("channel.json", %{channel: channel}) do
    %{id: channel.id,
      name: channel.name,
      description: channel.description}
  end
end
