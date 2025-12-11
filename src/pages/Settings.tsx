import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Database, Key, Palette, User, Webhook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    alerts: true,
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Page Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your preferences and integrations
        </p>
      </div>

      <Tabs defaultValue="general" className="animate-slide-up">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="general" className="gap-2">
            <User className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="integrations" className="gap-2">
            <Webhook className="h-4 w-4" />
            Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <div className="glass-card p-6 space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Organization Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input id="orgName" defaultValue="Acme Corporation" className="mt-1.5 bg-background" />
                </div>
                <div>
                  <Label htmlFor="currency">Default Currency</Label>
                  <Input id="currency" defaultValue="USD" className="mt-1.5 bg-background" />
                </div>
                <div>
                  <Label htmlFor="fiscalYear">Fiscal Year Start</Label>
                  <Input id="fiscalYear" defaultValue="January" className="mt-1.5 bg-background" />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" defaultValue="UTC-5 (Eastern)" className="mt-1.5 bg-background" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="font-semibold mb-4">AI Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-generate Insights</Label>
                    <p className="text-sm text-muted-foreground">Let AI analyze vendor data automatically</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Priority Score Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified when vendor scores change significantly</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              Save Changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <div className="glass-card p-6 space-y-6">
            <h3 className="font-semibold">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch 
                  checked={notifications.email}
                  onCheckedChange={(v) => setNotifications({ ...notifications, email: v })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Browser push notifications</p>
                </div>
                <Switch 
                  checked={notifications.push}
                  onCheckedChange={(v) => setNotifications({ ...notifications, push: v })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">Summary of vendor activity each week</p>
                </div>
                <Switch 
                  checked={notifications.weekly}
                  onCheckedChange={(v) => setNotifications({ ...notifications, weekly: v })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Critical Alerts</Label>
                  <p className="text-sm text-muted-foreground">Immediate alerts for important changes</p>
                </div>
                <Switch 
                  checked={notifications.alerts}
                  onCheckedChange={(v) => setNotifications({ ...notifications, alerts: v })}
                />
              </div>
            </div>

            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              Save Changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="mt-6">
          <div className="glass-card p-6 space-y-6">
            <h3 className="font-semibold">Backend Integrations</h3>
            <p className="text-sm text-muted-foreground">
              Connect to external services for enhanced functionality
            </p>

            <div className="grid gap-4">
              <div className="p-4 rounded-lg border border-border bg-muted/20">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Lovable Cloud</h4>
                    <p className="text-sm text-muted-foreground">Database, auth, and serverless functions</p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-muted/20">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Key className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">API Keys</h4>
                    <p className="text-sm text-muted-foreground">Manage external API integrations</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-muted/20">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Webhook className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Webhooks</h4>
                    <p className="text-sm text-muted-foreground">Set up event notifications</p>
                  </div>
                  <Button variant="outline">Setup</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
