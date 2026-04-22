import { Request, Response } from 'express';
import { SummaryValidator } from '../validators/summary.validator';
import { saveManagerSummary } from '../services/summary.service';

export const handleManagerSummary = async (req: Request, res: Response) => {
  try {
    const validation = SummaryValidator.validate(req.body);

    if (!validation.isValid) {
      console.warn('[SummaryController] Validation failed:', validation.errors);
      return res.status(400).json({
        success: false,
        message: 'Missing or invalid data',
        errors: validation.errors
      });
    }

    const result = await saveManagerSummary(validation.sanitizedData!);
    return res.status(201).json({
      success: true,
      message: 'Summary documented and email sent to manager.',
      data: {
        id: result.insertedId,
        emailStatus: result.emailSent ? 'Sent' : 'Failed to send'
      }
    });

  } catch (error) {
    console.error('[SummaryController] Critical error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while processing summary.'
    });
  }
};