defmodule LocalCafe.Location do
  alias LocalCafe.Location.Item

  use NimblePublisher,
    build: Item,
    from: Application.app_dir(:local_cafe, "priv/locations/**/*.md"),
    as: :locations

  # The @locations variable is first defined by NimblePublisher.
  # Export all locations
  def all_locations, do: @locations
end
