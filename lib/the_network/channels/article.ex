defmodule TheNetwork.Channels.Article do
  use Ecto.Schema
  import Ecto.Changeset
  alias TheNetwork.Channels.Article


  schema "channels_articles" do
    field :headline, :string
    field :url, :string

    timestamps()
  end

  @doc false
  def changeset(%Article{} = article, attrs) do
    article
    |> cast(attrs, [:headline, :url])
    |> validate_required([:headline, :url])
  end
end
