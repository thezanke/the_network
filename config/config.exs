# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :the_network,
  ecto_repos: [TheNetwork.Repo]

# Configures the endpoint
config :the_network, TheNetwork.Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "WQLiF6SGQFW7QqVTW3L3EY8tndtv7IDNwa61Asd+HUquQv+Iq1/KbsoO0QOjWmuZ",
  render_errors: [view: TheNetwork.Web.ErrorView, accepts: ~w(html json)],
  pubsub: [name: TheNetwork.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
