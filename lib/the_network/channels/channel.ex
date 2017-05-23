defmodule TheNetwork.Channels.Channel do
  use Ecto.Schema
  import Ecto.Changeset
  alias TheNetwork.Channels.Channel


  schema "channels_channels" do
    field :description, :string
    field :name, :string
    belongs_to :owner, TheNetwork.Accounts.User

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
