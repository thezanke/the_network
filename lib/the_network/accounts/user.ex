defmodule TheNetwork.Accounts.User do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  alias TheNetwork.Accounts.User

  schema "accounts_users" do
    field :name, :string
    has_one :channel, TheNetwork.Channels.Channel

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
