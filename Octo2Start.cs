using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(octo_signal.Octo2Start))]

namespace octo_signal
{
    public class Octo2Start
    {
        public void Configuration(IAppBuilder app)
        {
            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888
            app.MapSignalR();
        }
    }
}
