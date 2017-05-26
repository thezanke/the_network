defmodule TheNetwork.Channels.Comment do
  use Ecto.Schema
  import Ecto.Changeset

  alias TheNetwork.Channels.Comment
  alias TheNetwork.Channels.Article
  alias TheNetwork.Accounts.User

  schema "channels_comments" do
    field :content, :string
    belongs_to :user, User
    belongs_to :article, Article
    belongs_to :parent, Comment, foreign_key: :parent_comment_id

    timestamps()
  end

  @doc false
  def changeset(%Comment{} = comment, attrs) do
    comment
    |> cast(attrs, [:content, :article_id, :user_id, :parent_comment_id])
    |> validate_required([:content, :article_id, :user_id])
    |> assoc_constraint(:article)
    |> assoc_constraint(:user)
  end
end
