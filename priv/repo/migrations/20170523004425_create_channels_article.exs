defmodule TheNetwork.Repo.Migrations.CreateTheNetwork.Channels.Article do
  use Ecto.Migration

  def change do
    create table(:channels_articles) do
      add :headline, :string
      add :url, :string

      timestamps()
    end

  end
end
