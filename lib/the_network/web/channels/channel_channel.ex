defmodule TheNetwork.Web.ChannelChannel do
  @moduledoc false

  use TheNetwork.Web, :channel

  def join("channel:lobby", payload, socket) do
    {:ok, socket}
  end
end
