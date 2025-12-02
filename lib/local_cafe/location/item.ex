defmodule LocalCafe.Location.Item do
  @enforce_keys [:name, :body, :street, :city_state, :phone, :email, :hours]
  defstruct [:name, :body, :street, :city_state, :phone, :email, :hours, :latitude, :longitude]

  def build(_filename, attrs, body) do
    location = struct!(__MODULE__, [body: body] ++ Map.to_list(attrs))

    # Geocode address if lat/long not provided
    case {location.latitude, location.longitude} do
      {nil, nil} -> geocode(location)
      _ -> location
    end
  end

  defp geocode(location) do
    address = "#{location.street}, #{location.city_state}"

    case fetch_coordinates(address) do
      {:ok, lat, lon} ->
        %{location | latitude: lat, longitude: lon}

      {:error, _reason} ->
        # Return location without coordinates if geocoding fails
        location
    end
  end

  defp fetch_coordinates(address) do
    url = "https://nominatim.openstreetmap.org/search?q=#{URI.encode(address)}&format=json&limit=1"

    # Use User-Agent as required by Nominatim usage policy
    headers = [{~c"user-agent", ~c"LocalCafe Static Site Generator"}]

    case :httpc.request(:get, {String.to_charlist(url), headers}, [], []) do
      {:ok, {{_, 200, _}, _headers, body}} ->
        case Jason.decode(to_string(body)) do
          {:ok, [%{"lat" => lat, "lon" => lon} | _]} ->
            {:ok, lat, lon}

          {:ok, []} ->
            {:error, :not_found}

          {:error, reason} ->
            {:error, reason}
        end

      {:ok, {{_, status, _}, _, _}} ->
        {:error, {:http_error, status}}

      {:error, reason} ->
        {:error, reason}
    end
  end
end
