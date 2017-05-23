defmodule TheNetwork.Channels.Channel do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  alias TheNetwork.Channels.Article
  alias TheNetwork.Channels.Channel
  alias TheNetwork.Accounts.User

  schema "channels_channels" do
    field :description, :string
    field :name, :string
    belongs_to :owner, User
    has_many :articles, Article

    timestamps()
  end

  @doc false
  def changeset(%Channel{} = channel, attrs) do
    channel
    |> cast(attrs, [:name, :description, :owner_id])
    |> validate_required([:name, :description, :owner_id])
    |> assoc_constraint(:owner)
  end
end
