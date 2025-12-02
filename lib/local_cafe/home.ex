defmodule LocalCafe.Home do
  @enforce_keys [
    :site_name,
    :title,
    :description,
    :image,
    :body,
    :hero,
    :hero_image
  ]
  defstruct [
    :site_name,
    :title,
    :description,
    :image,
    :body,
    :hero,
    :hero_image,
    :domain,
    :logo
  ]

  def build(_filename, attrs, body) do
    struct!(__MODULE__, [body: body] ++ Map.to_list(attrs))
  end
end
