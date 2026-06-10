import React, { useState, useEffect } from "react";
import { Timer, Radio, ShieldAlert } from "lucide-react";

export default function AstronomyWidget() {
  const [utcTime, setUtcTime] = useState("");
  const [artemisCountdown, setArtemisCountdown] = useState({ days: 142, hours: 14, mins: 32, secs: 10 });
  const [telemetry, setTelemetry] = useState({ altitude: 418.5, velocity: 27584 });

  // Update telemetry and UTC clock
  useEffect(() => {
    const timer = setInterval(() => {
      // Current UTC time
      const now = new Date();
      setUtcTime(now.toUTCString().replace("GMT", "UTC"));

      // Artemis countdown simulation
      setArtemisCountdown((prev) => {
        if (prev.secs > 0) {
          return { ...prev, secs: prev.secs - 1 };
        } else if (prev.mins > 0) {
          return { ...prev, mins: prev.mins - 1, secs: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        } else {
          return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        }
      });

      // ISS telemtry fluctuation
      setTelemetry((prev) => {
        const altChange = (Math.random() - 0.5) * 0.2;
        const velChange = Math.floor((Math.random() - 0.5) * 6);
        return {
          altitude: parseFloat((prev.altitude + altChange).toFixed(2)),
          velocity: prev.velocity + velChange
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="border border-foreground p-6 bg-muted/10 transition-colors">
      <div className="tag-label text-accent-red flex items-center gap-1">
        <Radio className="w-3 h-3 animate-pulse" />
        Live Telemetry
      </div>
      
      {/* UTC Clock */}
      <div className="mt-3">
        <div className="text-xs text-muted-foreground tag-label">System Time (UTC)</div>
        <div className="font-mono text-sm font-semibold text-foreground mt-0.5">{utcTime || "Synchronizing..."}</div>
      </div>

      {/* ISS tracking */}
      <div className="mt-4 border-t border-rule pt-4">
        <div className="text-xs text-muted-foreground tag-label">ISS Orbit Status</div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <div className="text-[0.65rem] text-muted-foreground tag-label">Altitude</div>
            <div className="font-mono text-xs font-bold text-foreground">{telemetry.altitude} km</div>
          </div>
          <div>
            <div className="text-[0.65rem] text-muted-foreground tag-label">Velocity</div>
            <div className="font-mono text-xs font-bold text-foreground">{telemetry.velocity} km/h</div>
          </div>
        </div>
      </div>

      {/* Artemis Countdown */}
      <div className="mt-4 border-t border-rule pt-4">
        <div className="text-xs text-muted-foreground tag-label flex items-center gap-1">
          <Timer className="w-3 h-3 text-accent-red" />
          Artemis II Launch Target
        </div>
        <div className="grid grid-cols-4 gap-1 text-center mt-2">
          <div className="bg-foreground text-background p-1.5 rounded-sm">
            <div className="font-mono text-xs font-bold">{artemisCountdown.days}</div>
            <div className="text-[0.5rem] tag-label opacity-80">Days</div>
          </div>
          <div className="bg-foreground text-background p-1.5 rounded-sm">
            <div className="font-mono text-xs font-bold">{artemisCountdown.hours}</div>
            <div className="text-[0.5rem] tag-label opacity-80">Hrs</div>
          </div>
          <div className="bg-foreground text-background p-1.5 rounded-sm">
            <div className="font-mono text-xs font-bold">{artemisCountdown.mins}</div>
            <div className="text-[0.5rem] tag-label opacity-80">Mins</div>
          </div>
          <div className="bg-foreground text-background p-1.5 rounded-sm">
            <div className="font-mono text-xs font-bold">{artemisCountdown.secs}</div>
            <div className="text-[0.5rem] tag-label opacity-80">Secs</div>
          </div>
        </div>
      </div>

      {/* Solar storm report */}
      <div className="mt-4 border-t border-rule pt-4 flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 text-accent-red shrink-0 mt-0.5" />
        <div>
          <div className="text-[0.65rem] text-muted-foreground tag-label">Space Weather Alert</div>
          <p className="text-xs text-foreground mt-0.5">KP Index: 3 (Quiet). No geomagnetic storms predicted for the next 48h.</p>
        </div>
      </div>
    </div>
  );
}
