using System.Collections.Generic;

namespace ngWallet.DTOs.Response
{
    public class PrimaryChartDataResponse
    {
        public string Label { get; set; }
        public List<decimal> Data { get; set; }
    }
}