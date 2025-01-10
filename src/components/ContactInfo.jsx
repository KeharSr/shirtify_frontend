import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactInfo = () => (
  <ul className="space-y-3">
    <li className="flex items-center space-x-3">
      <MapPin className="text-red-500 w-5 h-5" />
      <span className="text-gray-600">123 Fashion Street, NY 10001</span>
    </li>
    <li className="flex items-center space-x-3">
      <Phone className="text-red-500 w-5 h-5" />
      <span className="text-gray-600">+977 98437123332</span>
    </li>
    <li className="flex items-center space-x-3">
      <Mail className="text-red-500 w-5 h-5" />
      <span className="text-gray-600">support@Shirtify.com</span>
    </li>
    <li className="flex items-center space-x-3">
      <Clock className="text-red-500 w-5 h-5" />
      <span className="text-gray-600">Mon - Sat: 9:00 - 18:00</span>
    </li>
  </ul>
);

export default ContactInfo;