using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;


namespace CA.Data
{
    public class WeatherForecastService
    {
        private static readonly HttpClient client = new HttpClient();
        JsonSerializerOptions _serializerOptions;

        public async Task<Response> GetForecastAsync()
        {
            _serializerOptions = new JsonSerializerOptions();
            try
            {
                HttpResponseMessage response = await client.GetAsync("https://script.google.com/macros/s/AKfycbyRsK4LUEB0RqmZKn41y85w8H_BiUZBT0GdSEUfOVfDf7ZBEEeEZPE4o5sIXfNeBrN3zQ/exec");
                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();

                // Parse the response body
                var data = new Response();
                try
                {
                    data = JsonConvert.DeserializeObject<Response>(responseBody);
                }
                catch (System.Text.Json.JsonException ex)
                {
                    Console.WriteLine($"An error occurred while deserializing the response body: {ex.Message}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An unexpected error occurred: {ex.Message}");
                }
                return data;

            }
            catch (HttpRequestException e)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message :{0} ", e.Message);
                return null;
            }
        }
    }

}
