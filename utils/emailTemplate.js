export const resetPasswordEmail = (reset_link) => {
  return ` <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; color: #333333; line-height: 1.6;">
        <div class="email-container" style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div class="email-card" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); overflow: hidden;">
                <div class="header" style="background-color: #2563eb; padding: 15px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 14px; font-weight: 600;">Password Reset Request</h1>
                </div>
                
                <div class="content" style="padding: 30px;">
                    <p>Hello,</p>
                    
                    <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
                    
                    <p>To reset your password, click the button below:</p>
                    
                    <div style="text-align: center;">
                        <a href="${reset_link}" class="button" style="display: inline-block; background-color: #2563eb; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; margin: 20px 0;">Reset Password</a>
                    </div>
                    
                    <p>This link will expire in 24 hours for security reasons.</p>
                    
                    <p>If the button above doesn't work, copy and paste this link into your browser:</p>
                    
                    <p style="word-break: break-all;">
                        <a href="${reset_link}" style="color: #2563eb; text-decoration: none;">${reset_link}</a>
                    </p>
                    
                    <p>Thank you</p>
                </div>
            </div>
        </div>
    </div>`;
};
