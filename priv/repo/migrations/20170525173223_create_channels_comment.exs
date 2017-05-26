defmodule TheNetwork.Repo.Migrations.CreateTheNetwork.Channels.Comment do
  use Ecto.Migration

  def change do
    create table(:channels_comments) do
      add :content, :text
      add :user_id, references(:accounts_users, on_delete: :nothing)
      add :article_id, references(:channels_articles, on_delete: :nothing)
      add :parent_comment_id, references(:channels_comments, on_delete: :nothing)

      timestamps()
    end

    create index(:channels_comments, [:user_id])
    create index(:channels_comments, [:article_id])
    create index(:channels_comments, [:parent_comment_id])
  end
end
