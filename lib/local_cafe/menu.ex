defmodule LocalCafe.Menu do
  alias LocalCafe.Menu.Item

  use NimblePublisher,
    build: Item,
    from: Application.app_dir(:local_cafe, "priv/menu/**/*.md"),
    as: :items

  # The @items variable is first defined by NimblePublisher.
  # Let's further modify it by sorting all items by descending date.
  # @items Enum.sort_by(@items, & &1.date, {:desc, Date})

  # Let's also get all tags
  @tags @items |> Enum.flat_map(& &1.tags) |> Enum.uniq() |> Enum.sort()

  # And finally export them
  def all_items, do: @items
  def all_tags, do: @tags
end
