using MyApp.ServiceInterface;
using ServiceStack.NativeTypes.TypeScript;

[assembly: HostingStartup(typeof(MyApp.AppHost))]

namespace MyApp;

public class AppHost() : AppHostBase("MyApp"), IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices((Action<WebHostBuilderContext, IServiceCollection>)((context, services) => {
            // Configure ASP.NET Core IOC Dependencies
            services.AddSingleton(context.Configuration.GetSection(nameof(AppConfig))?.Get<AppConfig>()
                ?? new AppConfig {
                        BaseUrl = context.HostingEnvironment.IsDevelopment()
                            ? "https://localhost:5001"  
                            : Environment.GetEnvironmentVariable("KAMAL_DEPLOY_HOST"),
                    });
            }));

    // Configure your AppHost with the necessary configuration and dependencies your App needs
    public override void Configure()
    {
        TypeScriptGenerator.InsertTsNoCheck = true;
        
        SetConfig(new HostConfig {
        });
    }
    
    // TODO: Replace with your own License Key. FREE Individual or OSS License available from: https://servicestack.net/free
    public static void RegisterKey() =>
        ServiceStack.Licensing.RegisterLicense("OSS BSD-3-Clause 2025 https://github.com/NetCoreTemplates/react-static Hr+5r6IrgUS9TBbFZAG1o1q28q8UZuJUmS/WZeWCHfi/xtvXENr5gWqCDeSCBXTYr3ueCSb+leabStYojXwnB6zLKFQ9qxqzesTyS43wYQNiuMuz2TkZ1R/Jy7otpJ7bDDn3vhI5IPliE+G6/3eiOMKV4PYLlS6X3VyuyPHBQrU=");
}
