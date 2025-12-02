defmodule LocalCafe.Site do
  use NimblePublisher,
    build: LocalCafe.Home,
    from: Application.app_dir(:local_cafe, "priv/home.md"),
    as: :home

  def site_settings() do
    @home |> List.first()
  end
end
