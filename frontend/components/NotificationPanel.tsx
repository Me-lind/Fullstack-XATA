import { Bell, Clock, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Notification } from "../types/types"; 


const NotificationsPanel = ({ 
    notifications, 
    onDismiss 
}: { 
    notifications: Notification[], 
    onDismiss: (id: string) => void 
}) => {
    return (
        <div className="flex space-x-3">
            {notifications.map(notification => (
                <div
                    key={notification.id}
                    className="flex items-start justify-between p-3 bg-gray-50 rounded-lg flex-grow"
                >
                    <div className="flex items-start gap-2">
                        {notification.type === 'deadline' && <Clock className="h-5 w-5 text-yellow-500" />}
                        {notification.type === 'mention' && <MessageSquare className="h-5 w-5 text-blue-500" />}
                        {notification.type === 'update' && <Bell className="h-5 w-5 text-green-500" />}
                        <div>
                            <p className="text-sm">{notification.message}</p>
                            {notification.timestamp && (
                                <p className="text-xs text-gray-500">
                                    {new Date(notification.timestamp).toLocaleString()}
                                </p>
                            )}
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDismiss(notification.id)}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default NotificationsPanel;