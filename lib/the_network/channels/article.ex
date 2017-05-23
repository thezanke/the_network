defmodule TheNetwork.Channels.Article do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  alias TheNetwork.Channels.Article
  alias TheNetwork.Channels.Channel

  schema "channels_articles" do
    field :headline, :string
    field :url, :string
    belongs_to :channel, Channel

    timestamps()
  end

  @doc false
  def changeset(%Article{} = article, attrs) do
    article
    |> cast(attrs, [:headline, :url, :channel_id])
    |> validate_required([:headline, :url, :channel_id])
    |> assoc_constraint(:channel)
  end
end
