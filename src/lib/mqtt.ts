// ============================================
// THADAM AI — MQTT Client
// ============================================

import mqtt, { type MqttClient, type IClientOptions } from 'mqtt';

// MQTT Topics
export const MQTT_TOPICS = {
  MACHINE_STATUS: 'thadam/machine/status',
  MACHINE_WEIGHT: 'thadam/machine/weight',
  MACHINE_IMAGE: 'thadam/machine/image',
  MACHINE_REWARD: 'thadam/machine/reward',
} as const;

export type MQTTTopic = (typeof MQTT_TOPICS)[keyof typeof MQTT_TOPICS];

let client: MqttClient | null = null;

/**
 * Get or create MQTT client
 */
export function getMqttClient(): MqttClient {
  if (client && client.connected) {
    return client;
  }

  const brokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883';

  const options: IClientOptions = {
    clientId: `thadam-backend-${Date.now()}`,
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 5000,
  };

  if (process.env.MQTT_USERNAME) {
    options.username = process.env.MQTT_USERNAME;
  }
  if (process.env.MQTT_PASSWORD) {
    options.password = process.env.MQTT_PASSWORD;
  }

  client = mqtt.connect(brokerUrl, options);

  client.on('connect', () => {
    console.log('[THADAM MQTT] Connected to broker');
  });

  client.on('error', (err) => {
    console.error('[THADAM MQTT] Connection error:', err.message);
  });

  client.on('reconnect', () => {
    console.log('[THADAM MQTT] Reconnecting...');
  });

  return client;
}

/**
 * Publish a message to an MQTT topic
 */
export function publish(topic: MQTTTopic | string, payload: Record<string, unknown>): Promise<void> {
  return new Promise((resolve, reject) => {
    const mqttClient = getMqttClient();
    mqttClient.publish(topic, JSON.stringify(payload), { qos: 1 }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Subscribe to an MQTT topic
 */
export function subscribe(
  topic: MQTTTopic | string,
  callback: (topic: string, payload: Record<string, unknown>) => void,
): void {
  const mqttClient = getMqttClient();

  mqttClient.subscribe(topic, { qos: 1 }, (err) => {
    if (err) {
      console.error(`[THADAM MQTT] Subscribe error for ${topic}:`, err.message);
    }
  });

  mqttClient.on('message', (receivedTopic, message) => {
    if (receivedTopic === topic) {
      try {
        const payload = JSON.parse(message.toString());
        callback(receivedTopic, payload);
      } catch {
        console.error('[THADAM MQTT] Failed to parse message:', message.toString());
      }
    }
  });
}

/**
 * Disconnect the MQTT client
 */
export function disconnect(): Promise<void> {
  return new Promise((resolve) => {
    if (client) {
      client.end(false, () => {
        client = null;
        resolve();
      });
    } else {
      resolve();
    }
  });
}
