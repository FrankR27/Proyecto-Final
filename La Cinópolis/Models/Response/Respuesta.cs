namespace La_Cinópolis.Models.Response
{
    public class Respuesta
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; } = null!;
        public object Result { get; set; } = null!;
    }
}
