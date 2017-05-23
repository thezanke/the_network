defmodule TheNetwork.Repo.Migrations.AddChannelToArticles do
  use Ecto.Migration

  def change do
    alter table(:channels_articles) do
      add :channel_id, references(:channels_channels, on_delete: :delete_all)
    end
  end
end
