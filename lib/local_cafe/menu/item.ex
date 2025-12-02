defmodule LocalCafe.Menu.Item do
  @enforce_keys [:title, :body, :description, :tags, :path, :prices]
  defstruct [:title, :body, :description, :tags, :prices, :path, :image]

  def build(filename, attrs, body) do
    [_, file] =
      String.split(Path.rootname(filename), Application.app_dir(:local_cafe, "priv"))

    struct!(__MODULE__, [body: body, path: Path.rootname(file) <> ".html"] ++ Map.to_list(attrs))
  end
end
