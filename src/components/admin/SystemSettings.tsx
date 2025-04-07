
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash, RefreshCw, Upload, HardDrive, Database } from 'lucide-react';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    allowStudentRegistration: true,
    enableNotifications: true,
    autoBackup: false,
    debugMode: false,
    maintenance: false
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    });
    
    toast.success(`${setting} setting updated`);
  };

  const handleBackupNow = () => {
    toast.success("System backup initiated");
  };

  const handleRestoreDatabase = () => {
    toast.success("Database restore completed");
  };

  const handleClearLogs = () => {
    toast.success("System logs cleared");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-secondary/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Database className="h-5 w-5 mr-2 text-primary" />
              System Configuration
            </CardTitle>
            <CardDescription>Manage core system settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="student-registration">Student Registration</Label>
                <p className="text-sm text-muted-foreground">Allow students to register accounts</p>
              </div>
              <Switch
                id="student-registration"
                checked={settings.allowStudentRegistration}
                onCheckedChange={() => handleToggle('allowStudentRegistration')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Send automated email notifications</p>
              </div>
              <Switch
                id="notifications"
                checked={settings.enableNotifications}
                onCheckedChange={() => handleToggle('enableNotifications')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-backup">Automatic Backups</Label>
                <p className="text-sm text-muted-foreground">Daily automated database backups</p>
              </div>
              <Switch
                id="auto-backup"
                checked={settings.autoBackup}
                onCheckedChange={() => handleToggle('autoBackup')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="debug-mode">Debug Mode</Label>
                <p className="text-sm text-muted-foreground">Enable extended logging and debugging</p>
              </div>
              <Switch
                id="debug-mode"
                checked={settings.debugMode}
                onCheckedChange={() => handleToggle('debugMode')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">Take the system offline for maintenance</p>
              </div>
              <Switch
                id="maintenance-mode"
                checked={settings.maintenance}
                onCheckedChange={() => handleToggle('maintenance')}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-secondary/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <HardDrive className="h-5 w-5 mr-2 text-primary" />
              Database Management
            </CardTitle>
            <CardDescription>Backup and restore system data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Database Backup</h3>
              <p className="text-sm text-muted-foreground">Create a backup of all system data</p>
              <Button 
                onClick={handleBackupNow} 
                className="w-full flex items-center justify-center gap-2"
              >
                <RefreshCw size={16} />
                Backup Now
              </Button>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Restore Database</h3>
              <p className="text-sm text-muted-foreground">Restore from a previous backup file</p>
              <Button 
                variant="outline" 
                onClick={handleRestoreDatabase} 
                className="w-full flex items-center justify-center gap-2"
              >
                <Upload size={16} />
                Restore Database
              </Button>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">System Logs</h3>
              <p className="text-sm text-muted-foreground">Clear system logs and error reports</p>
              <Button 
                variant="outline" 
                onClick={handleClearLogs} 
                className="w-full flex items-center justify-center gap-2"
              >
                <Trash size={16} />
                Clear Logs
              </Button>
            </div>
            
            <div className="pt-4 border-t border-border/10">
              <p className="text-sm text-muted-foreground">
                System Version: <span className="font-mono">1.0.0</span><br />
                Last Backup: <span className="font-mono">2025-04-07 09:15 AM</span><br />
                Database Size: <span className="font-mono">25.4 MB</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemSettings;
