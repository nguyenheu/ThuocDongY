import React from 'react';

const INFO = {
  ADDRESS: "Số 96 - 98 Nguyễn Viết Xuân, phường Quang Trung, quận Hà Đông, TP. Hà Nội",
  HOTLINE: "1800 5454 35",
  MOBILE: "0916.561.338",
  EMAIL: "cskh@dongduocphuchung.com.vn",
  TIME: "Thứ 2 - Thứ 7 (8:00 - 17:00)",
  MAP_URL: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.292513285662!2d105.7725833154019!3d20.98090899478673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135add3c62119c3%3A0x6d09f7e77f0d0e6b!2zOTYgTmd1eeG7hW4gVmnhur90IFh1w6JuLCBRdWFuZyBUcnVuZywgSMOgIMSQw7RuZywgSMOgIE7huqlpLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1625567890000!5m2!1sen!2s"
};

export default function ContactSection() {
  return (
    <section className="bg-white rounded-xl shadow-lg p-6 md:p-10">
      <h2 className="text-3xl font-bold text-red-700 mb-8">
        Địa chỉ và Liên hệ
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Thông tin Text */}
        <div className="space-y-4 text-gray-700 leading-7">
          <div>
            <span className="font-semibold text-red-700 block">Trụ sở chính:</span>
            {INFO.ADDRESS}
          </div>
          <div>
            <span className="font-semibold text-red-700 block">Điện thoại:</span>
            <a href={`tel:${INFO.HOTLINE.replace(/\s/g, '')}`} className="hover:text-red-700 font-bold">{INFO.HOTLINE}</a>
            {" - "}
            <a href={`tel:${INFO.MOBILE.replace(/\./g, '')}`} className="hover:text-red-700 font-bold">{INFO.MOBILE}</a>
          </div>
          <div>
            <span className="font-semibold text-red-700 block">Email:</span>
            <a href={`mailto:${INFO.EMAIL}`} className="hover:text-red-700">{INFO.EMAIL}</a>
          </div>
          <div>
            <span className="font-semibold text-red-700 block">Giờ làm việc:</span>
            {INFO.TIME}
          </div>
        </div>

        {/* Bản đồ Google Map */}
        <div className="relative overflow-hidden rounded-lg aspect-video shadow-lg border">
          <iframe
            src={INFO.MAP_URL}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Map"
          ></iframe>
        </div>
      </div>
    </section>
  );
}