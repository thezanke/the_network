defmodule TheNetwork.Web.ArticleView do
  use TheNetwork.Web, :view
  alias TheNetwork.Web.ArticleView

  def render("index.json", %{articles: articles}) do
    %{data: render_many(articles, ArticleView, "article.json")}
  end

  def render("show.json", %{article: article}) do
    %{data: render_one(article, ArticleView, "article.json")}
  end

  def render("article.json", %{article: article}) do
    %{id: article.id,
      headline: article.headline,
      url: article.url}
  end
end
